import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { QabilahIcon } from "@/assets/icons/QabilahIcon";
import { CONTACT_INFO } from "./contact-info";

export const SOCIAL_MEDIA = [
	{
		icon: FiLinkedin,
		href: CONTACT_INFO.linkedin,
		label: "linkedIn",
	},
	{
		icon: QabilahIcon,
		href: CONTACT_INFO.qabilah,
		label: "qabilah",
	},
	{
		icon: FiGithub,
		href: CONTACT_INFO.github,
		label: "gitHub",
	},
	{
		icon: FiMail,
		href: `mailto:${CONTACT_INFO.email}`,
		label: "email",
	},
] as const;
