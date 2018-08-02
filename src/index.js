const { GraphQLServer } = require("graphql-yoga");

let links = [
	{
		id: "link-0",
		url: "www.howtographql.com",
		description: "Fullstack tutorial for graphql"
	},
	{
		id: "link-1",
		url: "www.youtube.com",
		description: "largest video sharing site owned by google"
	},
	{
		id: "link-2",
		url: "www.facebook.com",
		description: "biggest social network owned by zuckerberg"
	}
];
let idCount = links.length;

const resolvers = {
	Query: {
		info: () => `this is the API of hackernews clone`,
		feed: () => links,
		link: (root, args) => {
			const linkarr = links.filter(link => link.id == args.id);
			let wantedlink = linkarr[0];
			return wantedlink;
		}
	},
	Mutation: {
		post: (root, args) => {
			const link = {
				id: `link-${idCount++}`,
				description: args.description,
				url: args.url
			};
			links.push(link);
			return link;
		},
		updateLink: (root, args) => {
			const linkIndex = links.findIndex(link => link.id == args.id);
			const extractedLink = links[linkIndex];
			const updatedLink = {
				id: extractedLink.id,
				description:
					args.description != null
						? args.description
						: extractedLink.description,
				url: args.url != null ? args.url : extractedLink.url
			};
			links.push(updatedLink);
			return updatedLink;
		},
		deleteLink: (root, args) => {
			const linkIndex = links.findIndex(link => link.id == args.id);
			const [deletedLink] = links.splice(linkIndex, 1);
			return deletedLink;
		}
	}
};

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers
});
server.start(() => console.log(`server is running in http://localhost:4000`));
