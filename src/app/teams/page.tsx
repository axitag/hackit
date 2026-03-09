import Teams from "@/components/Teams";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function TeamsPage() {
    return (
        <main className="min-h-screen bg-[var(--bg)] flex flex-col relative">
            <Navigation />
            <div className="flex-grow pt-24 pb-12">
                <Teams />
            </div>
            <Footer />
        </main>
    );
}
