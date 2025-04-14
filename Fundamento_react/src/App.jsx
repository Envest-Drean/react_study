import { Header } from "./componets/Header";
import { Post } from "./componets/post";
import { Sidebar } from "./componets/sidebar";

import style from "./app.module.css";

function App() {
	return (
		<div>
			<Header />
			<div className={style.wrapper}>
				<Sidebar />
				<main>
					<Post author="itto sanzzo" content="primeiro post test" />
					<Post author="miguel" content="test" />
				</main>
			</div>
		</div>
	);
}

export default App;
