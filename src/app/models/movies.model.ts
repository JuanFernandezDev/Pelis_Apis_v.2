export interface MovieResponse {
    page?: number;
    results?: Movie[];
    total_results?: number;
    total_pages?: number;
}

export class Movie {
    poster_path?: null;
    liked?: boolean;
    pending?: boolean;
    adult?: boolean;
    overview?: string;
    release_date?: Date;
    genre_ids?: number[];
    id?: number;
    original_title?: string;
    original_language?: string;
    title?: string;
    backdrop_path?: null;
    popularity?: number;
    vote_count?: number;
    video?: boolean;
    vote_average?: number;
}

export interface GenreResponse {
    genres?: Genre[];
}

export interface Genre {
    id?: number;
    name?: string;
}

export class Query {
    api_key: string = "6a98bac66a8fa62e25bcf3b221294b7f"
    page: number = 1 //Pagina inicializada a uno 
    language: string = "es-ES"
    sort_by: string = "popularity.desc" //Por defecto se busca por popularity,
    with_genres?: string
    query?: string
}

