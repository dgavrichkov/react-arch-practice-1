import { createBrowserRouter, Outlet } from "react-router-dom";
import { App } from "./App";
import { CharactersPage } from "@/pages/CharactersPage";
import { FavoritesPage } from "@/pages/FavoritesPage";
import { ROUTES } from "@/shared/constants/routes";
import { createCharactersContextProvider } from "@/entities/character/store/characters.context";
import { CharacterService } from "@/entities/character/services/CharacterService";
import {
  CharacterApiRepository,
  CharacterFavoritesLocalStorageRepository,
} from "@/entities/character";

const CharactersApi = new CharacterApiRepository();
const FavoritesApi = new CharacterFavoritesLocalStorageRepository();
const CharactersService = new CharacterService(CharactersApi, FavoritesApi);

const CharactersProvider = createCharactersContextProvider({
  characterService: CharactersService,
});

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    children: [
      {
        element: (
          <CharactersProvider>
            <Outlet />
          </CharactersProvider>
        ),
        children: [
          { index: true, element: <CharactersPage /> },
          { path: ROUTES.FAVORITES, element: <FavoritesPage /> },
        ],
      },
    ],
  },
]);
