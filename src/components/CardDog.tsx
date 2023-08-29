import { useState, useEffect } from 'react';
import { fetchData } from './api';
import { DogType } from './DogType';

function CardDog() {
  const [dog, setDog] = useState<DogType>();
  const [raça, setRaça] = useState<string>('');

  useEffect(() => {
    const saveUrl = localStorage.getItem('saveUrl');
    if (saveUrl) {
      setDog({ message: saveUrl });
    }
  }, []);

  useEffect(() => {
    // Vou comentar aqui para ficar mais facil de entender!
    if (dog) {
      localStorage.setItem('saveUrl', dog.message);

      // Obtém a raça do doguinho a partir da URL da imagem
      const urlParts = dog.message.split('/');
      // A raça do doguinho está no penúltimo elemento do array resultante /breeds/image/random
      const raçaNome = urlParts[urlParts.length - 2];
      // Define a raça no estado "breed"
      setRaça(raçaNome);

      alert(`${raçaNome}`);
    }
  }, [dog]);

  useEffect(() => {
    fetchData('https://dog.ceo/api/breeds/image/random')
      .then((data) => {
        setDog(data);
        console.log(data);
      });
  }, []);

  const NewImg = () => {
    fetchData('https://dog.ceo/api/breeds/image/random')
      .then((data) => {
        setDog(data);
        console.log(data);
      });
  };

  if (!dog) return <div><p>Loading...</p></div>;

  return (
    <div>
      <img src={ `${dog?.message}` } alt="Doguinho aleatório" />
      <button onClick={ NewImg }>Novo doguinho!</button>
    </div>
  );
}

export default CardDog;
