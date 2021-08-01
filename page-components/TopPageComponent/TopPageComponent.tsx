import {TopPageComponentProps} from './TopPageComponent.props';
import {Htag} from '../../components/Htag/Htag';
import {Ptag, Sort, Tag} from '../../components';
import styles from './TopPageComponent.module.css';
import {Card} from '../../components/Card/Card';
import {HhData} from '../../components/HhData/HhData';
import {TopLevelCategory} from '../../interfaces/page.interface';
import {Advantages} from '../../components/Advantages/Advantages';
import {Rating} from '../../components/Rating/Rating';
import {SortEnum} from '../../components/Sort/Sort.props';
import {useReducer, useState, useEffect} from 'react';
import {sortReducer} from './sort.reducer';
import {Product} from '../../components/Product/Product';

export const TopPageComponent = ({
  products,
  page,
  firstCategory,
  ...props
}: TopPageComponentProps): JSX.Element => {
  const [{products: sortedProducts, sort}, dispatchSort] = useReducer(
    sortReducer,
    {products, sort: SortEnum.Rating}
  );
  const setSort = (sort: SortEnum) => {
    dispatchSort({type: sort});
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <Htag tag="h1">{page.title} </Htag>
          {products && (
            <Tag color="grey" size="s">
              {products.length}
            </Tag>
          )}
          <Sort sort={sort} setSort={setSort}></Sort>
        </div>
        <div>
          {sortedProducts &&
            sortedProducts.map((p) => (
              <Product product={p} key={p._id}></Product>
            ))}
        </div>

        <div className={styles.hhTitle}>
          <Htag tag="h2">Jobs - {page.category}</Htag>
          <Tag color="red" size="m">
            hh.ru
          </Tag>
        </div>

        {firstCategory == TopLevelCategory.Courses && page.hh && (
          <HhData {...page.hh} />
        )}
        {page.advantages && page.advantages.length > 0 && (
          <>
            <Htag tag="h2">Преимушества</Htag>
            <Advantages advantages={page.advantages} />
          </>
        )}
        {page.seoText && (
          <div
            className={styles.seo}
            dangerouslySetInnerHTML={{__html: page.seoText}}
          />
        )}
        <Htag tag="h2"> Получаемые навыки</Htag>
        {page.tags.map((t) => (
          <Tag size="m" color="primary" key={t}>
            {t}
          </Tag>
        ))}
      </div>
    </>
  );
};
