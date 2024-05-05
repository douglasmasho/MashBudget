import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from "react-native";

const deviceHeight = Dimensions.get("window").height;

const BottomPopup = ({ show, close, onTouchOutside }) => {
  const popupList = [
    {
      id: 1,
      name: "See Details",
    },
    {
      id: 2,
      name: "Edit",
    },
    {
      id: 3,
      name: "Delete",
    },
  ];
  const renderOutsideTouchable = (onTouch) => {
    const view = <View style={{ flex: 1, width: "100%" }} />;

    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: "100%" }}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={{fontSize: 18, fontWeight: "normal", color: "#182e44"}}>{item.name}</Text>
      </View>
    );
  };

  const renderSeperator = () => {
    <View style={{ opacity: 0.1, backgroundColor: "#182e44", height: 1 }} />;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={close}
    >
      <View style={styles.modal}>
        {renderOutsideTouchable(onTouchOutside)}
        <View style={styles.modalInner}>
          <View>

            <FlatList
              style={styles.list}
              showsVerticalScrollIndicator={true}
              data={popupList}
              renderItem={renderItem}
              extraData={popupList}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={renderSeperator}
              contentContainerStyle={{
                // paddingBottom: 10,
                paddingTop: 10
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#000000AA",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalInner: {
    backgroundColor: "#fff",
    width: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 10,
    maxHeight: deviceHeight * 0.4,
  },
  text: {
    color: "#182e44",
    fontSize: 20,
    fontWeight: "500",
    margin: 15,
  },
  list: {
    marginBottom: 10,
  },
  item: {
    height: 50,
    flex: 1,
    alignItems: "center"
  },
});

export default BottomPopup;
