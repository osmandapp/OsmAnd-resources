#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
protobuf/src/protoc --java_out=${DIR}/../../android/OsmAnd-java/src --proto_path=${DIR} ${DIR}/OBF.proto
# protobuf/src/protoc --cpp_out=${DIR}/../../core/protos/ --proto_path=${DIR} ${DIR}/OBF.proto
# TODO core-legacy and other formats
protobuf/src/protoc --java_out=${DIR}/../../tools/OsmAndMapCreator/src --proto_path=${DIR} ${DIR}/osmformat.proto
protobuf/src/protoc --java_out=${DIR}/../../tools/OsmAndMapCreator/src --proto_path=${DIR} ${DIR}/fileformat.proto
