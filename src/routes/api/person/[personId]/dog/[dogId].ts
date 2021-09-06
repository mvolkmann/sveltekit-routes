import type {Request} from '@sveltejs/kit';
import type {Person, Dog} from '$lib/types';

type DogResponse = {body?: Dog | string; status?: number};

const comet: Dog = {
  name: 'Comet',
  breed: 'Whippet'
};

const maisey: Dog = {
  name: 'Maisey',
  breed: 'Treeing Walker Coonhound'
};

const oscar: Dog = {
  name: 'Oscar Wilde',
  breed: 'Lab mix'
};

const people: {[personId: string]: Person} = {
  '1': {
    name: 'Tami Volkmann',
    dogs: {
      '1': comet
    }
  },
  '2': {
    name: 'Amanda Nelson',
    dogs: {
      '1': maisey,
      '2': oscar
    }
  }
};

export async function get(request: Request): Promise<DogResponse> {
  const {personId, dogId} = request.params;
  console.log('[dogId].ts get: personId =', personId);
  console.log('[dogId].ts get: dogId =', dogId);

  console.log('[dogId].ts get: sleeping for 3 seconds');
  await sleep(3000); // simulate slow REST service
  console.log('[dogId].ts get: awake');

  const person = people[personId];
  if (!person) {
    return {body: `No person with id ${personId} was found.`, status: 404};
  }

  const dog = person.dogs[dogId];
  if (!dog) {
    const body = `No dog with id ${dogId} belonging to person ${personId} was found.`;
    return {body, status: 404};
  }

  return {body: dog};
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
