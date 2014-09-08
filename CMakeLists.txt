project(OsmAndCore_ResourcesBundle)

set(OsmAndCore_ResourcesBundle_src
	"${CMAKE_CURRENT_BINARY_DIR}/gen/EmbeddedResourcesBundle.cpp"
)

if (CMAKE_HOST_WIN32 AND NOT CYGWIN)
	add_custom_target(OsmAndCore_ResourcesBundle_VerifyPackagingList
		bash
			--login "${CMAKE_CURRENT_LIST_DIR}/verify-embed-resources-list.sh"
			"${CMAKE_CURRENT_BINARY_DIR}"
		WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
		COMMENT "Verifying packaging list...")

	add_custom_command(OUTPUT ${OsmAndCore_ResourcesBundle_src}
		COMMAND bash ARGS --login "${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh" "${CMAKE_CURRENT_BINARY_DIR}"
		DEPENDS
			"${CMAKE_CURRENT_LIST_DIR}/embed-resources.list"
			"${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh"
			"${CMAKE_CURRENT_LIST_DIR}/embed-resources.py"
		WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
		COMMENT "Embedding resources...")
else()
	add_custom_target(OsmAndCore_ResourcesBundle_VerifyPackagingList
		"${CMAKE_CURRENT_LIST_DIR}/verify-embed-resources-list.sh"
			"${CMAKE_CURRENT_BINARY_DIR}"
		WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
		COMMENT "Verifying packaging list...")

	add_custom_command(OUTPUT ${OsmAndCore_ResourcesBundle_src}
		COMMAND "${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh" "${CMAKE_CURRENT_BINARY_DIR}"
		DEPENDS
			"${CMAKE_CURRENT_LIST_DIR}/embed-resources.list"
			"${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh"
			"${CMAKE_CURRENT_LIST_DIR}/embed-resources.py"
		WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
		COMMENT "Embedding resources...")
endif()

if (CMAKE_SHARED_LIBS_ALLOWED_ON_TARGET)
	add_library(OsmAndCore_ResourcesBundle_shared SHARED
		${OsmAndCore_ResourcesBundle_src})
	add_dependencies(OsmAndCore_ResourcesBundle_shared
		OsmAndCore_ResourcesBundle_VerifyPackagingList)
endif()

if (CMAKE_STATIC_LIBS_ALLOWED_ON_TARGET)
	add_library(OsmAndCore_ResourcesBundle_static STATIC
		${OsmAndCore_ResourcesBundle_src})
	add_dependencies(OsmAndCore_ResourcesBundle_static
		OsmAndCore_ResourcesBundle_VerifyPackagingList)
	if (CMAKE_COMPILER_FAMILY STREQUAL "msvc")
		target_link_libraries(OsmAndCore_ResourcesBundle_static
			LINK_PUBLIC
				"-INCLUDE:___CoreResourcesEmbeddedBundle__FakeReferences"
		)
	endif()
endif()
