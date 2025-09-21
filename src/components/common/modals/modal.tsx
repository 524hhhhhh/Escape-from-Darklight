import React from "react";
import { Modal, View, Text } from "react-native";
import Button from "@/components/common/buttons/button";
import IconButton from "@/components/common/buttons/icon-button";
import { modalStyles } from "./modal-styles";

type ModalProps = {
  visible: boolean;
  title: string;
  subTitle?: string;
  primaryAction: { title: string; onPress: () => void };
  secondaryAction: { title: string; onPress: () => void };
  onClose?: () => void;
};

export default function AppModal({
  visible,
  title,
  subTitle,
  primaryAction,
  secondaryAction,
  onClose,
}: ModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      supportedOrientations={["landscape", "landscape-left", "landscape-right"]}
    >
      <View style={modalStyles.flex} />
      <View style={modalStyles.dim}>
        <View style={modalStyles.card}>
          {onClose && (
            <IconButton
              icon="X"
              onPress={onClose}
              style={modalStyles.closeProps}
            />
          )}

          <Text style={modalStyles.title}>{title}</Text>
          {subTitle ? (
            <Text style={modalStyles.subTitle}>{subTitle}</Text>
          ) : null}

          <View style={modalStyles.actions}>
            <Button
              title={primaryAction.title}
              onPress={primaryAction.onPress}
            />
            <Button
              title={secondaryAction.title}
              onPress={secondaryAction.onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
