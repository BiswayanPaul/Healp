import Head from 'next/head';

function IndexPage() {
    return (

        <Head>
            <title>Meta Tags</title>
            <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
            <meta name="google" content="notranslate" key="notranslate" />
            <meta name="description" content="Healp is a smart healthcare SaaS platform that connects patients and families with trusted doctors and hospitals quickly and easily." />
            <meta property="og:description" content="Healp is a modern SaaS healthcare platform designed to simplify access to medical care. Patients and their families can easily find verified doctors and partner hospitals, book appointments, and get essential support—all from a single, user-friendly interface." />

        </Head>

    );
}

export default IndexPage;