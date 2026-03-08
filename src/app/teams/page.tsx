import Teams from "@/components/Teams";
import Footer from "@/components/Footer";

export default function TeamsPage() {
    return (
        <main className="min-h-screen bg-[var(--bg)] flex flex-col">
            <div className="flex-grow pt-24 pb-12">
                <Teams />
            </div>
            <Footer />
        </main>
    );
}
