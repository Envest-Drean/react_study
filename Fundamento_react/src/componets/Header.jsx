import style from "./Header.module.css";
import ignitelogo from "../assets/Ignite-logo.svg";

export function Header() {
	return (
		<header className={style.header}>
			<img src={ignitelogo} alt="Ignite logotipo" />
			<strong>Ignite Feed</strong>
		</header>
	);
}
