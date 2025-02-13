import { watchSearch } from './search/searchSaga';
import { watchPosts } from './posts/postsSaga';

export default function* rootSaga() {
  yield watchPosts();
  yield watchSearch();
}
