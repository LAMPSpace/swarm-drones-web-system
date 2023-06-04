import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="en" className="h-100 scroll-behavior-smooth">
			<Head />
			<body className="d-flex flex-column">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
