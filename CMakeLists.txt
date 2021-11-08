project(OsmAndCore_ResourcesBundle)

if (CMAKE_HOST_WIN32 AND NOT CYGWIN)
	add_custom_command(OUTPUT "resources-bundle.stub"
		PRE_BUILD
		COMMAND bash ARGS --login "${CMAKE_CURRENT_LIST_DIR}/list-resources.sh" "${CMAKE_CURRENT_LIST_DIR}" "${CMAKE_CURRENT_LIST_DIR}/resources-bundle.cmake"
		BYPRODUCTS
			"resources-bundle.lists-index"
			"${CMAKE_CURRENT_LIST_DIR}/resources-bundle.cmake"
		WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
		COMMENT "Listing resources..."
	)
else()
	add_custom_command(OUTPUT "resources-bundle.stub"
		PRE_BUILD
		COMMAND "${CMAKE_CURRENT_LIST_DIR}/list-resources.sh" "${CMAKE_CURRENT_LIST_DIR}" "${CMAKE_CURRENT_LIST_DIR}/resources-bundle.cmake"
		BYPRODUCTS
			"resources-bundle.lists-index"
		WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
		COMMENT "Listing resources..."
	)
endif()

add_custom_target(OsmAndCore_ResourcesBundle_generate
	DEPENDS
		"resources-bundle.stub"
)

add_library(OsmAndCore_ResourcesBundle OBJECT
	"resources-bundle.h"
	"resources-bundle.cpp"
)
target_include_directories(OsmAndCore_ResourcesBundle
	PRIVATE
		"${CMAKE_CURRENT_SOURCE_DIR}"
)

add_dependencies(OsmAndCore_ResourcesBundle
	OsmAndCore_ResourcesBundle_generate
)

function(declare_resourcebundle)
	target_compile_definitions(OsmAndCore_ResourcesBundle
		PRIVATE
			BUNDLE_RESOURCES_COUNT=${ARGV0}
	)
endfunction()

function(add_resourcebundle_chunk)
	if (CMAKE_HOST_WIN32 AND NOT CYGWIN)
		add_custom_command(OUTPUT "${ARGV3}"
			COMMAND bash ARGS --login "${CMAKE_CURRENT_LIST_DIR}/embed-resources-chunk.sh" "${ARGV1}" "${ARGV3}" "${ARGV4}"
			DEPFILE "${ARGV2}"
			DEPENDS
				"${ARGV1}"
			WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
			COMMENT "Bundling resources (chunk #${ARGV0})..."
		)
	else()
		add_custom_command(OUTPUT "${ARGV3}"
			COMMAND "${CMAKE_CURRENT_LIST_DIR}/embed-resources-chunk.sh" "${ARGV1}" "${ARGV3}" "${ARGV4}"
			DEPFILE "${ARGV2}"
			DEPENDS
				"${ARGV1}"
			WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
			COMMENT "Bundling resources (chunk #${ARGV0})...")
	endif()
	target_sources(OsmAndCore_ResourcesBundle
		PRIVATE
			"${ARGV3}"
	)
endfunction()

include("resources-bundle.cmake")

if (CMAKE_SHARED_LIBS_ALLOWED_ON_TARGET)
	add_library(OsmAndCore_ResourcesBundle_shared SHARED
		$<TARGET_OBJECTS:OsmAndCore_ResourcesBundle>
	)
endif()

if (CMAKE_STATIC_LIBS_ALLOWED_ON_TARGET)
	add_library(OsmAndCore_ResourcesBundle_static STATIC
		$<TARGET_OBJECTS:OsmAndCore_ResourcesBundle>
	)
	# if (CMAKE_COMPILER_FAMILY STREQUAL "msvc")
	# 	target_link_libraries(OsmAndCore_ResourcesBundle_static
	# 		LINK_PUBLIC
	# 			"-INCLUDE:___CoreResourcesEmbeddedBundle__FakeReferences"
	# 	)
	# endif()
endif()
