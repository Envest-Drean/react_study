import { Header } from "./componets/Header";
import { Post } from "./post";
import { sidebar } from "./componets/sidebar";

import style from "./app.module.css";
import "./global.css";

function App() {
	return (
		<div>
			<Header />
			<div className={style.wrapper}>
				<sidebar />
				<main>
					<Post author="itto sanzzo" content="primeiro post test" />
					<Post author="miguel" content="test" />
				</main>
			</div>
		</div>
	);
}

export default App;
