import "styled-components";
import { defaultTheme } from "../styles/themes/default";

type themetype = typeof defaultTheme;

declare module "styled-components" {
	export interface DefaultTheme extends themetype {}
}
