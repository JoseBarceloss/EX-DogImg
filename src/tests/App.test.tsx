import React from 'react';
import {
  render,
  waitFor,
  screen,
  act,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';

import {
  returnBody,
  secondReturnBody,
  expectedUrl,
  getRequirementDescription,
  setupTest,
} from './utils';

const buttonText = 'Novo doguinho!';
const dogImageAltText = 'Doguinho aleatório';

describe(getRequirementDescription(1), () => {
  beforeEach(setupTest);
  afterEach(vi.restoreAllMocks);

  it('Será verificado que existe um texto `Loading...` presente na tela, enquanto a requisição é feita', async () => {
    render(<App />);

    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();

    await waitForElementToBeRemoved(loadingElement);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    await waitFor(() => expect(global.fetch).toBeCalledWith(expectedUrl));
  });

  it('Será verificado que a imagem renderizada possui os atributos `alt` e `src` corretos".', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    const dogImage: HTMLImageElement = await screen.findByAltText(dogImageAltText);
    expect(dogImage).toBeInTheDocument();
    expect(dogImage.src).toBe(returnBody.message);
  });

  it('Será verificado que existe um botão com o texto `Novo doguinho!`', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));

    const getDogButton = await screen.findByRole('button', {
      name: buttonText,
    });

    expect(getDogButton).toBeInTheDocument();

    await act(() => {
      userEvent.click(getDogButton);
    });

    expect(global.fetch).toBeCalledTimes(2);
  });
});

describe(getRequirementDescription(2), () => {
  beforeEach(setupTest);
  afterEach(vi.restoreAllMocks);

  it('Será verificado se a imagem gerada é salva no `localStorage`', async () => {
    vi.spyOn(Storage.prototype, 'setItem');
    render(<App />);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    await waitFor(() => expect(localStorage.setItem).toHaveBeenCalledTimes(1));
  });

  it('Será verificado se um `alert` é exibido informando a raça do doguinho', async () => {
    render(<App />);

    await waitFor(() => expect(global.fetch).toBeCalledTimes(1));
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(global.alert).toHaveBeenCalledWith('bulldog-english'));

    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: vi.fn().mockResolvedValue(secondReturnBody),
    } as any);

    const getDogButton = await screen.findByRole('button', {
      name: buttonText,
    });

    await act(() => {
      userEvent.click(getDogButton);
    });

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.alert).toHaveBeenCalledTimes(2);
    expect(global.alert).toHaveBeenCalledWith('shiba');
  });
});
