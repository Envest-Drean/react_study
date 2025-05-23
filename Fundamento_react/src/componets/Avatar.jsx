import style from "./Avatar.module.css";

export function Avatar({ hasBorder = true, src }) {
	return (
		<img
			className={hasBorder ? style.AvatarWithBorder : style.Avatar}
			src={src}
		/>
	);
}
