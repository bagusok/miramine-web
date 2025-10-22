export default function Footer() {
  return (
    <footer className="justify-self-end grid grid-flow-row lg:grid-cols-4 gap-6 mt-16 pb-4 pt-8 px-4 lg:px-10 bg-secondary">
      <div className="col-span-4 lg:col-span-2 ">
        <h3 className="text-xl font-semibold">Miramine</h3>
        <p className="text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          auctor, nunc sit amet ultricies.
        </p>
        <div className="flex gap-2 mt-4">
          <button className="rounded-full bg-primary text-white px-4 py-2 mt-4">
            Play Store
          </button>
          <button className="rounded-full bg-primary-foreground text-white px-4 py-2 mt-4">
            App Store
          </button>
        </div>
      </div>
      <div className="mt-4 col-span-4 lg:col-span-2 grid grid-cols-2 gap-4">
        <div className="col-span-1">
          <h3 className="text-lg font-semibold">Sosial Media</h3>
          <p className="text-sm mt-2">Instagram</p>
          <p className="text-sm mt-2">Facebook</p>
          <p className="text-sm mt-2">Tiktod</p>
          <p className="text-sm mt-2">Youtube</p>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold">Lainnya</h3>
          <p className="text-sm mt-2">Kebijakan Privasi</p>
          <p className="text-sm mt-2">Syarat dan Ketentuan</p>
          <p className="text-sm mt-2">DMCA</p>
          <p className="text-sm mt-2">Apalah</p>
        </div>
      </div>
      <div className="col-span-4 mt-4">
        <p className="text-sm">&copy; 2025 Miramine. All rights reserved.</p>
      </div>
    </footer>
  );
}
