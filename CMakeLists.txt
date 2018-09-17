project(OsmAndCore_ResourcesBundle)

set(OsmAndCore_ResourcesBundle_src "")

set(OsmAndCore_ResourcesCppIndex_src 
	"${CMAKE_CURRENT_LIST_DIR}/embed-resources-cpp.index")

if (EXISTS ${OsmAndCore_ResourcesCppIndex_src})
	if (CMAKE_HOST_WIN32 AND NOT CYGWIN)
		file(STRINGS ${OsmAndCore_ResourcesCppIndex_src} OsmAndCore_ResourcesBundle_src)
		set(listVar "")
	   	foreach(f ${OsmAndCore_ResourcesBundle_src})
	    	set(listVar ${listVar} "${CMAKE_CURRENT_BINARY_DIR}${f}")
	   	endforeach(f)
	   	set(OsmAndCore_ResourcesBundle_src ${listVar})
		set_source_files_properties(${OsmAndCore_ResourcesBundle_src} PROPERTIES GENERATED TRUE)

		add_custom_command(OUTPUT ${OsmAndCore_ResourcesBundle_src}
			PRE_BUILD
			COMMAND bash ARGS --login "${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh" "${CMAKE_CURRENT_BINARY_DIR}"
			DEPENDS
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources-cpp.index"
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources.index"
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh"
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources.py"
			WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
			COMMENT "Embedding resources...")
	else()
		file(STRINGS ${OsmAndCore_ResourcesCppIndex_src} OsmAndCore_ResourcesBundle_src)
		set(listVar "")
	   	foreach(f ${OsmAndCore_ResourcesBundle_src})
	    	set(listVar ${listVar} "${CMAKE_CURRENT_BINARY_DIR}${f}")
	   	endforeach(f)
	   	set(OsmAndCore_ResourcesBundle_src ${listVar})
	   	set_source_files_properties(${OsmAndCore_ResourcesBundle_src} PROPERTIES GENERATED TRUE)

		add_custom_command(OUTPUT ${OsmAndCore_ResourcesBundle_src}
			PRE_BUILD
			COMMAND "${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh" "${CMAKE_CURRENT_BINARY_DIR}"
			DEPENDS
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources-cpp.index"
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources.index"
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources.sh"
				"${CMAKE_CURRENT_LIST_DIR}/embed-resources.py"
			WORKING_DIRECTORY "${CMAKE_CURRENT_BINARY_DIR}"
			COMMENT "Embedding resources...")
	endif()

	# this is the "object library" target: compiles the sources only once
	add_library(objlib OBJECT ${OsmAndCore_ResourcesBundle_src})

	# shared libraries need PIC
	set_property(TARGET objlib PROPERTY POSITION_INDEPENDENT_CODE 1)

	if (CMAKE_SHARED_LIBS_ALLOWED_ON_TARGET)
		add_library(OsmAndCore_ResourcesBundle_shared SHARED $<TARGET_OBJECTS:objlib>)
		#add_library(OsmAndCore_ResourcesBundle_shared SHARED ${OsmAndCore_ResourcesBundle_src})
	endif()

	if (CMAKE_STATIC_LIBS_ALLOWED_ON_TARGET)
		add_library(OsmAndCore_ResourcesBundle_static STATIC $<TARGET_OBJECTS:objlib>)
		#add_library(OsmAndCore_ResourcesBundle_static STATIC ${OsmAndCore_ResourcesBundle_src})
#		if (CMAKE_COMPILER_FAMILY STREQUAL "msvc")
#			target_link_libraries(OsmAndCore_ResourcesBundle_static
#				LINK_PUBLIC
#					"-INCLUDE:___CoreResourcesEmbeddedBundle__FakeReferences"
#			)
#		endif()
	endif()
endif()
