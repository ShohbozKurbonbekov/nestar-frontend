import PropertiesMain from "./_components/PropertiesMain";
import PropertiesSort from "./_components/PropertiesSort";

export default function Property() {
  return (
    <section className="py-20">
      <PropertiesSort />
      <PropertiesMain />
    </section>
  );
}
