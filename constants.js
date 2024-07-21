export const Colors = {
  blackPrimary: "#0a0a0a",
  blackSecondary: "#1A1A1A",
  blackTertiary: "#262626",
  greenPrimary: "#1F883D",
  textPrimary: "#BB86FC",
  textSecondary: "#d1d5db",
  textTertiary: "#BFBFBF",
  cardBackground: "#212121",
  modalBackground: "#EAF1FB",
  modalOverlay: "rgba(0,0,0,0.5)",
};

export const ModalOverlay = {
  flex: 1,
  padding: 20,
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.modalOverlay,
};

export const ModalContainer = {
  gap: 10,
  width: "100%",
  padding: 20,
  borderRadius: 20,
  alignItems: "center",
  backgroundColor: Colors.modalBackground,
  paddingHorizontal: 30,

  elevation: 10,
  shadowRadius: 10,
  shadowOpacity: 0.5,
  paddingVertical: 20,
  shadowOffset: { height: 3, width: 3 },
  shadowColor: Colors.blackTertiary,
};

export const ModalTitle = {
  fontSize: 20,
  marginBottom: 20,
  fontWeight: "bold",
};

export const ButtonContainer = {
  gap: 30,
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
};
