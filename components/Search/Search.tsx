import cn from 'classnames';
import {Button} from '../Button/Button';
import {Input} from '../Input/Input';
import styles from './Search.module.css';
import {SearchProps} from './Search.props';

import {useState} from 'react';
import SearchIcon from './glass.svg';
import {useRouter} from 'next/dist/client/router';
export const Search = ({className, ...props}: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      goToSearch();
    }
  };

  const goToSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search,
      },
    });
  };
  return (
    <div className={cn(className, styles.search)} {...props}>
      <Input
        className={styles.input}
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        arrow="none"
        className={styles.button}
        appearance="primary"
        onClick={goToSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
