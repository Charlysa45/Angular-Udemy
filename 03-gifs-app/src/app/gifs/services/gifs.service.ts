import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { map, Observable, tap } from 'rxjs';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'searchHistory'

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifsFormLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'
  const gifs = JSON.parse(gifsFormLocalStorage)

  return gifs
}

@Injectable({ providedIn: 'root' })

export class GifService {
  private http = inject(HttpClient)

  trendingGifs = signal<Gif[]>([]) // [gif, gif, gif, gif...]
  trendingGifsLoading = signal(false)
  private trendingPage = signal(0)

  // [ [gif, gif, gif], [gif, gif, gif], [gif, gif, gif]]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = []
    for (let i = 0; i < this.trendingGifs().length; i+=3) {
      groups.push(this.trendingGifs().slice(i, i + 3))
    }
    return groups // [ [gif1, gif2, gif3], [gi4, gi5, gi6] ]
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(() => {
    // localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()))
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem(GIF_KEY, historyString)
  })

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(`${environment.GIPHY_BASE_URL}/gifs/trending`, {
      params: {
        api_key: environment.API_KEY_GIPHY,
        limit: 20,
        offset: this.trendingPage() * 20
      }
    })
    .subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data)
      this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs])
      this.trendingPage.update((currentPage) => currentPage + 1)
      this.trendingGifsLoading.set(false)
    })
  }
  
  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.GIPHY_BASE_URL}/gifs/search` , {
      params: {
        api_key: environment.API_KEY_GIPHY,
        q: query,
        limit: 20
      }
    })
    .pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

      // TODO Historial
      tap((items) => {
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
    // .subscribe((search) => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(search.data)
    //   console.log({ gifs });
    // })
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []
  }
}