import { useFontMetrics } from '@context';
import { useDropZone } from '@hooks';

export const HomePage = () => {
  const { state, loadFont, clearFont } = useFontMetrics();

  const { isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileChange } =
    useDropZone({
      onFileSelect: async (file) => {
        await loadFont(file);
      },
      onError: (error) => {
        console.error('Drop zone error:', error);
      },
      accept: '.ttf,.otf,.woff,.woff2',
      maxSize: 10 * 1024 * 1024, // 10MB
    });

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Font Metrics Analyzer</h1>

      {/* File upload area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          padding: '2rem',
          border: isDragging ? '2px solid blue' : '2px dashed gray',
          borderRadius: '8px',
          textAlign: 'center',
          backgroundColor: isDragging ? '#f0f8ff' : 'white',
          cursor: 'pointer',
          marginBottom: '2rem',
        }}
      >
        <input
          type="file"
          accept=".ttf,.otf,.woff,.woff2"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          id="font-input"
        />
        <label htmlFor="font-input" style={{ cursor: 'pointer' }}>
          {isDragging
            ? 'Drop font file here...'
            : 'Click to upload or drag and drop a font file'}
        </label>
      </div>

      {/* Loading state */}
      {state.isLoading && <p>Loading font...</p>}

      {/* Error state */}
      {state.error && (
        <div style={{ color: 'red', padding: '1rem', marginBottom: '1rem' }}>
          Error: {state.error}
        </div>
      )}

      {/* Display metrics */}
      {state.metrics && (
        <div>
          <h2>Font Information</h2>
          <button
            onClick={clearFont}
            style={{
              marginBottom: '1rem',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
            }}
          >
            Clear Font
          </button>

          <div style={{ marginTop: '1rem' }}>
            <h3>
              {state.metrics.familyName} - {state.metrics.subFamilyName}
            </h3>
            <p>Category: {state.metrics.category}</p>
            <p>Units Per Em: {state.metrics.unitsPerEm}</p>

            <h4>Vertical Metrics</h4>
            <ul>
              <li>Ascender (hhea): {state.metrics.hheaAscent}</li>
              <li>Descender (hhea): {state.metrics.hheaDescent}</li>
              <li>Visual Ascent: {state.metrics.visualAscent}</li>
              <li>Visual Descent: {state.metrics.visualDescent}</li>
              <li>Line Gap: {state.metrics.lineGap}</li>
            </ul>

            <h4>Character Heights</h4>
            <ul>
              <li>Cap Height: {state.metrics.capHeight}</li>
              <li>x-Height: {state.metrics.xHeight}</li>
              <li>Average Char Width: {state.metrics.avgCharWidth}</li>
            </ul>

            <h4>Trim Values</h4>
            <ul>
              <li>Top Trim: {state.metrics.topTrim}</li>
              <li>Bottom Trim: {state.metrics.bottomTrim}</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
