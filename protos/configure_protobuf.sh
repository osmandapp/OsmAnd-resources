#!/bin/bash
if [ ! -d protobuf ]; then
   git clone https://github.com/google/protobuf.git
   cd protobuf && git checkout v2.5.0 && ./configure && cd - 
fi 
cd protobuf 
make install
cd .. 
mkdir -p protobuf-java
rm -rf protobuf-java/*
cp -rf protobuf/java/src/main/java/* protobuf-java/
patch --directory=. -p0 --input=protobuf-2.5.patch
protobuf/src/protoc --java_out=protobuf-java/ --proto_path=protobuf/src/google/protobuf/ protobuf/src/google/protobuf/descriptor.proto 
cp -rf protobuf-java/* $(pwd)/../../android/OsmAnd-java/src/
 
