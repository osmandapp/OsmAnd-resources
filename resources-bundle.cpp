#include "resources-bundle.h"

#if !defined(BUNDLE_RESOURCES_COUNT)
#   define BUNDLE_RESOURCES_COUNT 0
#endif // !defined(BUNDLE_RESOURCES_COUNT)

extern "C" {

    const uint32_t __CoreResourcesEmbeddedBundle__ResourcesCount = BUNDLE_RESOURCES_COUNT;
    EMIT_GETTER(__CoreResourcesEmbeddedBundle__ResourcesCount, &)

} // extern "C"
