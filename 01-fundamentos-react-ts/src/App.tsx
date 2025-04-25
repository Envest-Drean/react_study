import { Header } from "./components/Header";
import { Author, content, Post } from "./components/Post";
import { Sidebar } from "./components/sidebar";
import style from "./app.module.css";

// author: {avatar_url: "",name: "", role: ""}
// publishedAt: date
//content: string

type Post = {
	id: number;
	author: Author;
	contents: content[];
	publishedAt: Date;
};

const posts: Post[] = [
	{
		id: 1,
		author: {
			avatarUrl: "https://github.com/ittosanzzo.png",
			name: "Itto Sanzzo",
			role: "developer fullstack",
		},
		contents: [
			{ type: "paragraph", content: "Olá, pessoal!" },
			{
				type: "paragraph",
				content:
					"Acabo de adicionar um novo projeto ao meu portfólio: um bot de música desenvolvido especialmente para o meu RPG. O projeto se chama Chariot 🚀,a vingaça nunca é plena,mata a alma e envenena",
			},
			{
				type: "link",
				content: "👉acesse em: github.com/IttoSanzzo/ChariotSanzzo",
			},
			{ type: "link", content: "#albina #envest #perck" },
		],
		publishedAt: new Date("2025 - 04 - 22, 01:27:27"),
	},
	{
		id: 2,
		author: {
			avatarUrl: "https://github.com/envest-Drean.png",
			name: "Envest-Drean",
			role: "Developer Newbie",
		},
		contents: [
			{ type: "paragraph", content: "Olá, pessoal!" },
			{
				type: "paragraph",
				content:
					"Acabo de adicionar um projeto ao meu portfólio: um site feito apartir dos cursos da Rocketseat 🚀",
			},
			{
				type: "link",
				content: "👉acesse em: https://github.com/Envest-Drean/themeSwitcher",
			},
			{ type: "link", content: "#site #itto #perck" },
		],
		publishedAt: new Date("2025 - 04 - 21, 00:27:27"),
	},
];
function App() {
	return (
		<div>
			<Header />
			<div className={style.wrapper}>
				<Sidebar />
				<main>
					{posts.map((post) => {
						return (
							<Post
								key={post.id}
								author={post.author}
								content={post.contents}
								publishedAt={post.publishedAt}
							/>
						);
					})}
				</main>
			</div>
		</div>
	);
}

export default App;
