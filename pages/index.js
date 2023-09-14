import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import List from "../src/components/People/List";
import logo from "../public/logo.png";

export default function Home({ people }) {
  const [residents, setResidents] = useState(false);
  const [_filteredresidents, setFilteredResidents] = useState([]);
  const [planet, setPlanet] = useState("");
  const [hasResults, setResults] = useState(false);
  const [results, setSearchResults] = useState(false);
  const [totalpages, SetTotalPages] = useState(0);
  const [total, SetTotal] = useState(0);
  const inputRef = useRef();
  const resultsRef = useRef();
  const [input, setInput] = useState(false);
  const resultsperpage = 10; // use this to change pagination
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //handle search event
  const handleSearch = (event) => {
    event.preventDefault();
    setInput(input);
    let results = people.filter(
      ({ name }) => input && name.toLowerCase().includes(input.toLowerCase())
    );
    if (!results.length) alert("no results for the query");
    setSearchResults(results);
    let _hasResults = results && results.length > 0;
    setResults(_hasResults);
  };

  // handle  input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // fill list data
  const displayResults = (pagenumber, residents) => {
    let n =
      pagenumber == 0
        ? pagenumber * resultsperpage
        : --pagenumber * resultsperpage;
    SetTotal(residents.length);
    const _filteredData = residents.slice(n, n + resultsperpage);
    setFilteredResidents(_filteredData);
    SetTotalPages(Math.ceil(residents.length / resultsperpage));
    setResults(0);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>StarWARZ</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.headerLogo}>
            <Image src={logo} alt="logo" />
          </div>
          <div className={styles.headerSearchBar}>
            <form className={styles.form} method="post" autoComplete="off">
              <input
                ref={inputRef}
                type="search"
                name="query"
                onChange={(e) => {
                  handleInputChange(e);
                }}
              />
              <span>
                <button
                  type="submit"
                  onClick={(e) => handleSearch(e)}
                  className={styles.submitbutton}
                >
                  SEARCH
                </button>
              </span>
             {hasResults && (
                <div className={styles.autocomplete}>
                  <ul ref={resultsRef} className={styles.people}>
                    {results.map((result) => {
                      return (
                        <li key={result.url}>
                          <a
                            onClick={() => {
                              setResidents(result.residents);
                              displayResults(0, result.residents);
                              setPlanet(result.name);
                            }}
                          >
                            {result.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </header>

        {residents.length && (
          <div className={styles.section}>
            <h5>
              Showing {total} people from Planet {planet}
            </h5>
            <nav>
              <ul className={styles.pagination}>
                {new Array(totalpages).fill().map((item, index) => {
                  return (
                    <li className={styles.pageItem} key={index}>
                      <a
                        className="page-link"
                        onClick={() => {
                          displayResults(index, residents);
                        }}
                      >
                        {++index}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}

        {!residents.length  && input &&  (
          <div className={styles.error}>No people on this planet</div>
        )}
        {residents.length && <List residents={_filteredresidents} />}

        <div></div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const pageCount = 3;
  let people = [];

  for (let i = 0; i < pageCount; i++) {
    const response = await fetch(`https://swapi.dev/api/planets?page=${i + 1}`);
    const data = await response.json();
    console.log(data);
    people = people.concat(data.results);
  }

  return {
    props: {
      people,
    },
  };
}
