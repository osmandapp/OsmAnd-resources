#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
# protobuf/src/protoc --java_out=${DIR}/../../android/OsmAnd-java/src/main/java --proto_path=${DIR} ${DIR}/OBF.proto
 protobuf/src/protoc --java_out=${DIR}/../../android/OsmAnd-java/src/main/java --proto_path=${DIR} ${DIR}/osmand_index.proto
# protobuf/src/protoc --java_out=${DIR}/../../tools/OsmAndMapCreator/src --proto_path=${DIR} ${DIR}/osmformat.proto
# protobuf/src/protoc --java_out=${DIR}/../../tools/OsmAndMapCreator/src --proto_path=${DIR} ${DIR}/fileformat.proto

# protobuf/src/protoc --cpp_out=${DIR}/../../core/protos/ --proto_path=${DIR} ${DIR}/OBF.proto
# protobuf/src/protoc --cpp_out=${DIR}/../../core/protos/ --proto_path=${DIR} ${DIR}/osmand_index.proto

# protobuf/src/protoc --cpp_out=${DIR}/../../core-legacy/native/src/proto --proto_path=${DIR} ${DIR}/OBF.proto
# protobuf/src/protoc --cpp_out=${DIR}/../../core-legacy/native/src/proto --proto_path=${DIR} ${DIR}/osmand_index.proto
