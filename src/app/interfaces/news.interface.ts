export interface News {
    source: {  // Cambiado de 'sorce' a 'source'
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: News[];
}