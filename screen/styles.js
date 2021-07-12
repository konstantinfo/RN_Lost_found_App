import { StyleSheet, Dimensions, Platform } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";

import Colors from "../../utils/colors";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.yellow
  },
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.yellow
  },
  backContainer: {
    marginTop: Platform.OS === "ios" ? (isIphoneX() ? 32 : 16) : 0,
    padding: 10,
    backgroundColor: Colors.yellow,
    flexDirection: "row",
    height: 50
  },
  viewHeader: {
    flexDirection: "row",
    alignItems: "center"
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: Colors.yellow
  },
  txtMangeTags: {
    fontSize: 18,
    flex: 1
  },
  txtGenerate: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black"
  },
  chatContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16
  },
  bottomContainer: {
    flex: 1,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: Colors.yellow,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  viewFooter: {
    flexDirection: "row",
    backgroundColor: Colors.yellow,
    padding: 16
  },
  inputContainer: {
    flex: 1,
    marginRight: 12
  },
  input: {
    maxHeight: 68,
    borderColor: Colors.yellow,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 16,
    paddingTop: 8,
    textAlignVertical: "top",
    color: "black"
  },
  btnSend: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: Colors.yellow
  },
  backConainer: {
    backgroundColor: Colors.yellow,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    height: 48
  },
  backTitle: {
    flex: 1,
    color: Colors.blue,
    fontSize: 20,
    marginLeft: 15
  },
  backImage: {
    width: 24,
    height: 24
  }
});

export default styles;
