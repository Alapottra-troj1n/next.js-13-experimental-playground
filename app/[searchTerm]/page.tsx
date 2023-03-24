import getWikiResults from "@/lib/getWikiResults";
import Item from "./Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

export async function generateMetadata({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikiData;
  const displayTerm = searchTerm.replaceAll("%20", " ");

  if (!data?.query?.pages) {
    return {
      title: `${displayTerm} Not Found`,
    };
  }

  return {
    title: displayTerm,
    description: `Search results for ${displayTerm}`,
  };
}

export default async function SearchTerm({ params: { searchTerm } }: Props) {
  const wikiData: Promise<SearchResult> = getWikiResults(searchTerm);
  const wiki = await wikiData;

  const results: Result[] | undefined = wiki.query?.pages;

  const content = (
    <main className="min-h-screen">
      {results ? (
        Object.values(results).map((result) => <Item key={result.pageid} result={result} />)
      ) : (
        <h2>{`${searchTerm} not found`}</h2>
      )}
    </main>
  );
  return <div>{content}</div>;
}
