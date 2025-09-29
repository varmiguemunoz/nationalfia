function blockChildrenText(children: any[]): string {
  if (!Array.isArray(children)) return '';
  return children.map((span) => (typeof span?.text === 'string' ? span.text : '')).join('');
}

function PortableRenderer({ body }: { body: any[] }) {
  return (
    <>
      {Array.isArray(body) &&
        body.map((block: any) => {
          if (block?._type === 'block') {
            const text = blockChildrenText(block.children);
            switch (block.style) {
              case 'h1':
                return <h1 className="mb-4 mt-8 text-4xl font-bold">{text}</h1>;
              case 'h2':
                return <h2 className="mb-4 mt-8 text-3xl font-semibold">{text}</h2>;
              case 'h3':
                return <h3 className="mb-3 mt-6 text-2xl font-semibold">{text}</h3>;
              case 'blockquote':
                return <blockquote className="my-6 border-l-4 border-primary/40 pl-4 italic">{text}</blockquote>;
              default:
                return <p className="mb-4 leading-7">{text}</p>;
            }
          }
          if (block?._type === 'image') {
            const src = block?.asset?.url || block?.asset?._ref || '';
            const alt = block?.alt || '';
            if (!src) return null;
            return <img src={src} alt={alt} className="my-6 w-full rounded-xl" loading="lazy" />;
          }
          return null;
        })}
    </>
  );
}

export default PortableRenderer;
