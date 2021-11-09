#include <stddef.h>
#include <stdint.h>

#define ___STRINGIFY2(x) #x
#define ___STRINGIFY(x) ___STRINGIFY2(x)

#if defined(_WIN32) || defined(__CYGWIN__)
#   define BUNDLE_API __declspec(dllexport)
#elif (defined(__GNUC__) && __GNUC__ >= 4) || defined(__clang__)
#   define BUNDLE_API __attribute__ ((visibility("default"), used))
#else
#   define BUNDLE_API
#endif

#if defined(_MSC_VER)
#   define EMIT_GETTER(varname, accessor)\
        __pragma( comment ( linker, "/INCLUDE:_"___STRINGIFY( __get__##varname ) ) )\
        BUNDLE_API const void* __get__##varname() {\
            return reinterpret_cast<const void*>(accessor varname);\
        }
#else
#   define EMIT_GETTER(varname, accessor)\
        BUNDLE_API const void* __get__##varname() {\
            return reinterpret_cast<const void*>(accessor varname);\
        }
#endif // defined(_MSC_VER)
