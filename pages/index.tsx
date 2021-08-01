import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import {Htag} from '../components/Htag/Htag';
import {Button} from '../components/Button/Button';
import {useState} from 'react';
import {Ptag} from '../components/Ptag/P';
import {Tag} from '../components/Tag/Tag';
import {Rating} from '../components';

import {withLayout} from '../layout/Layout';
import {GetStaticProps} from 'next';
import axios from 'axios';
import {MenuItem} from '../interfaces/menu.interface';
import {Input} from '../components/Input/Input';
import {Textarea} from '../components/Textarea/Textarea';

function Home({menu}: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <>
        <Htag tag="h1">Hello</Htag>
        <Htag tag="h2">Hello</Htag>
        <Htag tag="h3">Hello</Htag>
        <Button appearance="primary">Hello</Button>
        <Button appearance="ghost">Hello</Button>
        <Ptag size="l">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          adipisci, quibusdam laudantium dolore culpa praesentium maiores rem.
          Tempora laboriosam repudiandae eum!
        </Ptag>
        <Ptag size="m">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, sunt!
        </Ptag>
        <Ptag size="s">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, sunt!
        </Ptag>
        <Tag size="s" color="ghost">
          Ghost
        </Tag>
        <Tag size="m" color="green">
          Green
        </Tag>
        <Tag size="m" color="red">
          Red
        </Tag>
        <Tag size="m" color="grey">
          Grey
        </Tag>
        <Tag size="m" color="primary">
          Primary
        </Tag>
        <Rating rating={rating} isEditable setRating={setRating} />
        <Input placeholder="some" />
        <Textarea />
      </>
    </>
  );
}
export default withLayout(Home);

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
