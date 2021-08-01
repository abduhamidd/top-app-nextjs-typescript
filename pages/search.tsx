import React, {useState} from 'react';

import {withLayout} from '../layout/Layout';
import {GetStaticProps} from 'next';
import axios from 'axios';
import {MenuItem} from '../interfaces/menu.interface';

function Search({menu}: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <h2>Search</h2>
    </>
  );
}
export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const {data: menu} = await axios.post<MenuItem[]>(
    process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find/',
    {
      firstCategory,
    }
  );
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}
