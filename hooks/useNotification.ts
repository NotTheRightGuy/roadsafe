import { useToast } from "./use-toast";

export function useNotification() {
	const { toast } = useToast()
	return {
		notify: (title: string, message: string) => {
			toast({ title: title, description: message })
			const utterance = new SpeechSynthesisUtterance(message);
			window.speechSynthesis.speak(utterance);
		},
	};
}