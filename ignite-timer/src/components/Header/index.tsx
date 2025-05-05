import { HeaderContainer } from "./Styles";
import Logo from "../../assets/Logo.svg";
import { Timer, Scroll } from "phosphor-react";
import { NavLink } from "react-router-dom";
export function Header() {
	return (
		<HeaderContainer>
			<img src={Logo} alt="two triagle green" title="logo ignite" />
			<nav>
				<NavLink to="/" title="timer">
					<Timer size={24} />
				</NavLink>
				<NavLink to="/history" title="Historico">
					<Scroll size={24} />
				</NavLink>
			</nav>
		</HeaderContainer>
	);
}
