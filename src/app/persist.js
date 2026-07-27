import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";

export const persistor = persistStore;
export { storage };