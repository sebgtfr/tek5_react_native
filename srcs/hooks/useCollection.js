import { Firestore } from '../configs/Firebase';

const useCollection = (collection) => Firestore.collection(collection);

export default useCollection;
