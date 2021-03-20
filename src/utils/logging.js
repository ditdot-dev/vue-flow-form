import { firestore } from "../../examples/firstquiz/util/firebase";
import moment from "moment";

export const logging = async text => {
  const data = await firestore
    .collection("logs")
    .doc(moment().format("YYYY-MM-DD"))
    .get()

  await firestore
    .collection("logs")
    .doc(moment().format("YYYY-MM-DD"))
    .set({
      ...(data.data() || {}),
      [moment().format("HH:mm:ss")]: text
    });
};
