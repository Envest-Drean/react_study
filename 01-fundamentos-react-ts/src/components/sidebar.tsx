import { PencilLine } from "phosphor-react";
import style from "./sidebar.module.css";
import { Avatar } from "./Avatar";

export function Sidebar() {
	return (
		<aside className={style.sidebar}>
			<img
				className={style.cover}
				src="https://images.unsplash.com/photo-1708032565079-f43e698f4db9?q=10&w=570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
			/>
			<div className={style.profile}>
				<Avatar src="https://github.com/envest-Drean.png" />

				<strong>Itto Sanzzo</strong>
				<span>Web Developer</span>
			</div>
			<footer>
				<a href="#">
					<PencilLine size={20} />
					editar perfil
				</a>
			</footer>
		</aside>
	);
}
