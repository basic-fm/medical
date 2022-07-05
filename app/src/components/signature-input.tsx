import React, { useRef, useState } from "react";
import { Button, Modal, SafeAreaView, TextInput, View } from "react-native";
import SignatureScreen from "react-native-signature-canvas";
import { CustomButton } from "./custom-button";

const style = `.m-signature-pad {box-shadow: none; border: none;} 
              .m-signature-pad--body {border: none;background-color: #efefef;border-radius: 8px;}
              .m-signature-pad--footer {display: none; margin: 0px;}`;

export function SignatureInput({ initialData, onOK }: any) {
  const ref = useRef<any>();

  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState(initialData?.name);

  const handleClear = () => {
    ref.current.clearSignature();
  };

  const handleConfirm = () => {
    ref.current.readSignature();
  };

  const handleOk = (signature: any) => {
    if (!name) {
      return;
    }
    onOK({ signature, name });
    setName("");
    setModalVisible(false);
  };

  if (!modalVisible) {
    return (
      <CustomButton onPress={() => setModalVisible(true)}>Sign</CustomButton>
    );
  }

  return (
    <Modal>
      <SafeAreaView>
        <View
          style={{
            height: 50,
            backgroundColor: "#fff",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 16,
          }}
        >
          <View></View>
          <Button title={"Cancel"} onPress={() => setModalVisible(false)} />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 430,
            padding: 10,
          }}
        >
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            style={{
              backgroundColor: "#efefef",
              borderRadius: 8,
              width: "100%",
              padding: 14,
              marginBottom: 8,
            }}
          />
          <SignatureScreen ref={ref} webStyle={style} onOK={handleOk} />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Button title="Clear" onPress={handleClear} />
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
