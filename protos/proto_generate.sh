#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
protobuf/src/protoc --java_out=${DIR}/../../android/OsmAnd-java/src --proto_path=${DIR} ${DIR}/OBF.proto
