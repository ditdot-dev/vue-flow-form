import { firestore } from "../../examples/firstquiz/util";

export const TAX_API_DEV_KEYS = async () => {
  const devKeys = await firestore
    .collection("DEV_KEYS")
    .doc("TAX_API")
    .get();
  return devKeys.data();
};
