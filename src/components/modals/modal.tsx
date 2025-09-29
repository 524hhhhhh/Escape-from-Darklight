import React from "react";
import { Modal, View } from "react-native";
import Button from "@/components/buttons/button";
import IconButton from "@/components/buttons/icon-button";
import { modalStyles } from "./modal-styles";
import AppText from "../text/app-text";

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

          <AppText variant="TITLE_XL" style={modalStyles.title}>
            {title}
          </AppText>
          {subTitle ? (
            <AppText variant="TITLE_R" style={modalStyles.subTitle}>
              {subTitle}
            </AppText>
          ) : null}

          <View style={modalStyles.actions}>
            <Button
              variant="TITLE_M"
              title={primaryAction.title}
              onPress={primaryAction.onPress}
            />
            <Button
              variant="TITLE_M"
              title={secondaryAction.title}
              onPress={secondaryAction.onPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
