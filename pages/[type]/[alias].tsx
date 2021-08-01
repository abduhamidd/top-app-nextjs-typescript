import {MenuItem} from '../../interfaces/menu.interface';

import {ProductModel} from '../../interfaces/product.interface';
import {TopPageModel, TopLevelCategory} from '../../interfaces/page.interface';
import {withLayout} from './../../layout/Layout';
import {GetStaticProps, GetStaticPaths, GetStaticPropsContext} from 'next';
import {firstLevelMenu} from '../../helpers/helpers';
import {ParsedUrlQuery} from 'querystring';
import axios from 'axios';
import {API} from './../../helpers/api';
import {TopPageComponent} from './../../page-components/TopPageComponent/TopPageComponent';
function TopPage({firstCategory, page, products}: TopPageProps): JSX.Element {
  return (
    <TopPageComponent
      firstCategory={firstCategory}
      page={page}
      products={products}
    ></TopPageComponent>
  );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id,
    });
    paths = paths.concat(
      menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`))
    );
  }

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });
    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }
    const {data: page} = await axios.get<TopPageModel>(
      API.topPage.byAlias + params.alias
    );
    const {data: products} = await axios.post<ProductModel[]>(
      API.product.find,
      {
        category: page.category,
        limit: 10,
      }
    );

    return {
      props: {
        menu,
        products,
        firstCategory: firstCategoryItem.id,
        page,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: TopPageModel;
  firstCategory: TopLevelCategory;
  products: ProductModel[];
}
