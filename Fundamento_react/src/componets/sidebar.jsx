import style from "./sidebar.module.css";

export function sidebar() {
	<aside className={style.sidebar}>
		<img src="https://images.unsplash.com/photo-1708032565079-f43e698f4db9?q=10&w=570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
		<div className="style.profile">
			<strong>itto sanzzo</strong>
			<span>web developer</span>
		</div>
		<footer>
			<a href="#">editar perfil</a>
		</footer>
	</aside>;
}
