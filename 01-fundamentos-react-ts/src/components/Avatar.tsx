import { ImgHTMLAttributes } from "react";
import style from "./Avatar.module.css";

interface avatarprops extends ImgHTMLAttributes<HTMLImageElement> {
	hasBorder?: boolean;
}

export function Avatar({ hasBorder = true, ...props }: avatarprops) {
	return (
		<img
			className={hasBorder ? style.AvatarWithBorder : style.Avatar}
			{...props}
		/>
	);
}
